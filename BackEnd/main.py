from fastapi import FastAPI
import mysql.connector
from typing import Optional 
from pydantic import BaseModel 
from fastapi.middleware.cors import CORSMiddleware



origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://127.0.0.1:5500",
    "http://localhost:4200/",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RDV(BaseModel):
    idp:int
    date:str
    time:str

class Patient(BaseModel):
    nom:str
    prenom:str
    genre:str
    cin:str
    adr:str
    tel:str
    
class User(BaseModel):
    email:str
    password:str

class Texte(BaseModel):
    ch:str



mydb = mysql.connector.connect(host="localhost",user="root",password="",database="mydb")

@app.get("/")
async def TEST():
    return {"TEST": "👽👽👽"}


#check user log in
@app.post("/login-user")
def verifier_login(u:User):
    mycursor = mydb.cursor() 
    sql="SELECT idSec,mailSec,count(*) from secretaire where mailSec=%s and passSec=%s"
    vls=[u.email,u.password]
    mycursor.execute(sql,vls)
    myuser = mycursor.fetchall()
    ch={"id":myuser[0][0],"mail":myuser[0][1],"verif":myuser[0][2]}
    return ch

# charger la liste des patients
@app.get("/patient") 
def load_patient(cin : Optional[str]=None ,nom : Optional[str]=None ,prenom : Optional[str]=None): 
    mycursor = mydb.cursor()
    sql="SELECT idPat,nomPat,prenomPat,genre,dateNPat FROM patient"
    vals=list()
    ch=list()
    if(cin != None or nom != None or prenom != None):
        sql+=" where"
        if (cin != None):
            ch.append(" cinPat=%s ")
            vals.append(cin)
        if (nom != None):
            ch.append(" nomPat=%s ")
            vals.append(nom)
        if (prenom != None):
            ch.append(" prenomPat=%s ")
            vals.append(prenom)
        sql+="and".join(ch)

    mycursor.execute(sql,vals) 
    myresult = mycursor.fetchall()
    
    t=list()
    for (idPat,nomPat,prenomPat,genre,dateNPat) in myresult:
        sql="SELECT count(*) FROM rdv where idPat=%s"
        vals=[idPat]
        mycursor.execute(sql,vals)       
        mycount =mycursor.fetchall()
        pat=dict()
        pat["nom"]=nomPat
        pat["prenom"]=prenomPat
        pat["nbconsulte"]=mycount[0][0]
        pat["genre"]=genre
        pat["inscri"]=str(dateNPat)

        t.append(pat)
    return t


# ajouter un patient
@app.post("/patient")
def ajouter_patient(p:Patient):
    mycursor = mydb.cursor() 
    sql="INSERT INTO patient (nomPat,prenomPat,genre,cinPat,adressPat,telPat,dateNPat,Secretaire_idSec) VALUES(%s,%s,%s,%s,%s,%s,date(now()),1)"
    vls=[p.nom,p.prenom,p.genre,p.cin,p.adr,p.tel]
    mycursor.execute(sql,vls)
    mydb.commit()
    sql="SELECT idPat FROM patient where cinPat=%s"
    vals=[p.cin]
    mycursor.execute(sql,vals) 
    myid = mycursor.fetchall()
    ch="Patient ajouté avec id : "+str(myid[0][0])
    return {"message":ch}


# charger la liste des rendez-vous
@app.get("/rendez-vous") 
def load_rdv(): 
    mycursor = mydb.cursor()
    sql="SELECT p.idPat,p.nomPat,p.prenomPat,p.genre,r.datetimeRDV FROM rdv r ,patient p where p.idPat=r.idPat order by `datetimeRDV` DESC"
    mycursor.execute(sql) 
    myresult = mycursor.fetchall()
    
    t=list()
    for (idPat,nomPat,prenomPat,genre,dateNPat) in myresult:
        sql="SELECT count(*) FROM rdv where idPat=%s"
        vals=[idPat]
        mycursor.execute(sql,vals)       
        mycount =mycursor.fetchall()
        pat=dict()
        pat["nom"]=nomPat
        pat["prenom"]=prenomPat
        pat["nbconsulte"]=mycount[0][0]
        pat["genre"]=genre
        pat["temps"]=str(dateNPat)

        t.append(pat)
    return t


# ajouter un rendez-vous
@app.post("/rendez-vous")
def ajouter_rdv(rdv:RDV):
    mycursor = mydb.cursor() 
    sql="INSERT INTO rdv (idPat,datetimeRDV,Secretaire_idSec) VALUES(%s,%s,1)"
    dt=str(rdv.date)+" "+str(rdv.time)
    vls=[rdv.idp,dt]
    mycursor.execute(sql,vls)
    mydb.commit()
    return {"message":"Rendez-vous ajouté"}


#  rdv qui reste aujourd'hui
@app.get("/dashboard/RDV-reste-today")
def load_rdv_reste_today(): 
    mycursor = mydb.cursor()
    sql="SELECT p.idPat,p.nomPat,p.prenomPat,p.genre,r.datetimeRDV FROM rdv r ,patient p where p.idPat=r.idPat and date(r.datetimeRDV)=date(now()) and time(r.datetimeRDV)>time(now()) order by `datetimeRDV` ASC LIMIT 10;"
    mycursor.execute(sql) 
    myresult = mycursor.fetchall()
    
    t=list()
    for (idPat,nomPat,prenomPat,genre,dateNPat) in myresult:
        sql="SELECT count(*) FROM rdv where idPat=%s"
        vals=[idPat]
        mycursor.execute(sql,vals)       
        mycount =mycursor.fetchall()
        pat=dict()
        pat["nom"]=nomPat
        pat["prenom"]=prenomPat
        pat["nbconsulte"]=mycount[0][0]
        pat["genre"]=genre
        pat["temps"]=str(dateNPat)

        t.append(pat)
    return t
 

# nbr des patients et rendez-vous dans les 10 derniers mois
@app.get("/dashboard/patient-rdv-derniers-mois")
def load_stat_derniers_mois(): 
    mycursor = mydb.cursor()
    t=list()
    for i in range(10):
        sql="SELECT COUNT(*) , MONTHNAME(ADDDATE(now(), INTERVAL -%s MONTH)) from rdv where MONTH(ADDDATE(now(), INTERVAL -%s MONTH))=MONTH(datetimeRDV) and YEAR(ADDDATE(now(), INTERVAL -%s MONTH))=YEAR(datetimeRDV)"
        vals=[i,i,i]
        mycursor.execute(sql,vals)       
        mycountrdv =mycursor.fetchall()
        sql="SELECT COUNT(*) , MONTHNAME(ADDDATE(now(), INTERVAL -%s MONTH)) from patient where MONTH(ADDDATE(now(), INTERVAL -%s MONTH))=MONTH(dateNPat) and YEAR(ADDDATE(now(), INTERVAL -%s MONTH))=YEAR(dateNPat)"
        mycursor.execute(sql,vals)       
        mycountpat =mycursor.fetchall()
        k=dict()
        k["mois"]=mycountrdv[0][1]
        k["nbpat"]=mycountpat[0][0]
        k["nbconsulte"]=mycountrdv[0][0]

        t.append(k)
    return t


#  chargement des donnes de stat (chart + 3 valeurs du haut)

@app.get("/dashboard/donnees-stat")
def load_donnees_stat(): 
    mycursor = mydb.cursor()
    d=dict()
    # nbr des patients et rendez-vous dans les 7 derniers jours
    lab=list()
    line1r=list()
    line2p=list()
    for i in range(7):
        sql="SELECT COUNT(*) , MONTHNAME(ADDDATE(now(), INTERVAL -%s DAY)),DAY(ADDDATE(now(), INTERVAL -%s DAY)) from rdv where DATE(ADDDATE(now(), INTERVAL -%s DAY))=DATE(datetimeRDV)"
        vals=[i,i,i]
        mycursor.execute(sql,vals)       
        mycountrdv =mycursor.fetchall()
        sql="SELECT COUNT(*) , MONTHNAME(ADDDATE(now(), INTERVAL -%s DAY)),DAY(ADDDATE(now(), INTERVAL -%s DAY)) from patient where DATE(ADDDATE(now(), INTERVAL -%s DAY))=DATE(dateNPat)"
        mycursor.execute(sql,vals)       
        mycountpat =mycursor.fetchall()
        lab.append(str(mycountrdv[0][2])+" "+mycountrdv[0][1])
        line2p.append(mycountpat[0][0])
        line1r.append(mycountrdv[0][0])

    

    # nbr total des patients(par rapport au mois dernier) *
    k=dict()
    t=list()
    sql="SELECT COUNT(*) FROM patient"
    mycursor.execute(sql)       
    mycountpat =mycursor.fetchall()
    sql="SELECT COUNT(*) from patient where MONTH(ADDDATE(now(), INTERVAL -1 MONTH))=MONTH(dateNPat) and YEAR(ADDDATE(now(), INTERVAL -1 MONTH))=YEAR(dateNPat)"
    mycursor.execute(sql)       
    mycountpat_last =mycursor.fetchall()
    k=dict()
    k["nb"]=mycountpat[0][0]
    por=(mycountpat[0][0]-mycountpat_last[0][0])/mycountpat[0][0]*100
    if por<0:
        por=por*-1
        k["condition"]="-"
    else:
        k["condition"]="+"
    k["porcentage"]=por
    t.append(k)

    #nbr rendez-vous aujourd'hui (par raport au jour avant) *
    sql="SELECT COUNT(*) from rdv where date(now())=date(datetimeRDV) and date(now())=date(datetimeRDV)"
    mycursor.execute(sql)       
    mycountrdv =mycursor.fetchall()
    sql="SELECT COUNT(*) from rdv where DATE(ADDDATE(now(), INTERVAL -1 DAY))=DATE(datetimeRDV)"
    mycursor.execute(sql)       
    mycountrdv_last =mycursor.fetchall()
    sql="SELECT COUNT(*) from rdv"
    mycursor.execute(sql)       
    mycountrdv_tot =mycursor.fetchall()
    k=dict()
    k["nb"]=mycountrdv[0][0]
    por=(mycountrdv[0][0]-mycountrdv_last[0][0])/mycountrdv_tot[0][0]*100
    if por<0:
        por=por*-1
        k["condition"]="-"
    else:
        k["condition"]="+"
    k["porcentage"]=por
    t.append(k)


    # nbr nouveau patients dans ce mois (par rapport au mois dernier)*
    sql="SELECT COUNT(*) from patient where MONTH(now())=MONTH(dateNPat) and YEAR(now())=YEAR(dateNPat)"
    mycursor.execute(sql)       
    mycountpat =mycursor.fetchall()
    sql="SELECT COUNT(*) from patient where MONTH(ADDDATE(now(), INTERVAL -1 MONTH))=MONTH(dateNPat) and YEAR(ADDDATE(now(), INTERVAL -1 MONTH))=YEAR(dateNPat)"
    mycursor.execute(sql)       
    mycountpat_last =mycursor.fetchall()
    sql="SELECT COUNT(*) from patient"
    mycursor.execute(sql)       
    mycountpat_tot =mycursor.fetchall()
    k=dict()
    k["nb"]=mycountpat[0][0]
    por=(mycountpat[0][0]-mycountpat_last[0][0])/mycountpat_tot[0][0]*100
    if por<0:
        por=por*-1
        k["condition"]="-"
    else:
        k["condition"]="+"
    k["porcentage"]=por
    t.append(k)


    d["cardstat"]=t
    d["label"]=lab
    d["line1"]=line1r
    d["line2"]=line2p
    return d
    
@app.post("/filetxt")
def sauvegarder_presentation(t:Texte):
    f = open("myFile.txt", "w")
    f.write(t.ch)
    f.close()
    return {"message":"fichier sauvegardé"}  
    
@app.get("/filetxt")
def load_presentation():
    f = open("myFile.txt", "r")
    ch=f.read()
    f.close()
    return {"content":ch}     

