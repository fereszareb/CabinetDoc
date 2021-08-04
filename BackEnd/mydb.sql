-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2021 at 08:30 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `idPat` int(11) NOT NULL,
  `nomPat` varchar(45) NOT NULL,
  `prenomPat` varchar(45) NOT NULL,
  `genre` varchar(15) DEFAULT NULL,
  `cinPat` varchar(45) DEFAULT 'none',
  `adressPat` varchar(45) DEFAULT NULL,
  `telPat` varchar(45) DEFAULT 'none',
  `dateNPat` date DEFAULT NULL,
  `Secretaire_idSec` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`idPat`, `nomPat`, `prenomPat`, `genre`, `cinPat`, `adressPat`, `telPat`, `dateNPat`, `Secretaire_idSec`) VALUES
(1, 'Chebbi', 'Firas', 'masculin', '11111111', '64 West Glen Eagles Street Shakopee, MN 55379', '90111111', '2021-04-19', 1),
(2, 'Becha', 'Sonia', 'féminin', '22222222', '984 University St. Deer Park, NY 11729', '90222222', '2021-04-12', 1),
(3, 'Allison', 'Arnie ', 'féminin', '33333333', '714 East Mechanic St.\r\nLouisville, KY 40207', '90333333', '2020-04-19', 1),
(4, 'Mccoy', 'Zofia', 'féminin', '44444444', '7605 Grand Dr.\r\nMoncks Corner, SC 29461', '90444444', '2021-04-17', 1),
(5, 'Kirby', 'Cristian ', 'féminin', '55555555', '717 Myers Dr. Alabaster, AL 35007', '90555555', '2021-03-01', 1),
(10, 'Abidi', 'Kamel', 'masculin', '99816237', '454 George Street Sevierville, TN 37876', '8495621777', '2021-04-26', 1),
(11, 'Abidi', 'Yasmine', 'feminin', '15151515', '142 Jones Ave. Melbourne, FL 32904', '51246236', '2021-04-26', 1),
(12, 'Ferchichi', 'Jalel', 'masculin', '48591515', '346 Ridgewood Lane Land O Lakes, FL 34639', '11221122', '2021-04-26', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rdv`
--

CREATE TABLE `rdv` (
  `idRDV` int(11) NOT NULL,
  `datetimeRDV` datetime DEFAULT NULL,
  `idPat` int(11) DEFAULT NULL,
  `Secretaire_idSec` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rdv`
--

INSERT INTO `rdv` (`idRDV`, `datetimeRDV`, `idPat`, `Secretaire_idSec`) VALUES
(1, '2021-04-21 20:00:00', 3, 1),
(2, '2021-04-21 16:30:00', 2, 1),
(3, '2021-04-10 14:00:00', 3, 1),
(4, '2021-04-12 14:30:00', 4, 1),
(5, '2021-04-25 20:00:00', 1, 1),
(6, '2021-03-16 10:00:00', 1, 1),
(7, '2021-04-21 13:00:00', 1, 1),
(8, '2021-08-10 17:30:00', 5, 1),
(9, '2021-04-25 23:00:00', 3, 1),
(10, '2021-04-22 10:30:00', 4, 1),
(11, '2021-04-26 18:31:00', 5, 1),
(12, '2021-04-26 01:29:00', 1, 1),
(13, '2021-04-28 17:31:00', 1, 1),
(14, '2021-04-27 22:25:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `secretaire`
--

CREATE TABLE `secretaire` (
  `idSec` int(11) NOT NULL,
  `mailSec` varchar(45) NOT NULL,
  `passSec` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `secretaire`
--

INSERT INTO `secretaire` (`idSec`, `mailSec`, `passSec`) VALUES
(1, 'alexa@CabinetDoc.com', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`idPat`,`Secretaire_idSec`),
  ADD UNIQUE KEY `cinPat` (`cinPat`),
  ADD KEY `fk_Patient_Secretaire1_idx` (`Secretaire_idSec`);

--
-- Indexes for table `rdv`
--
ALTER TABLE `rdv`
  ADD PRIMARY KEY (`idRDV`,`Secretaire_idSec`),
  ADD KEY `fk_idpat_idx` (`idPat`),
  ADD KEY `fk_RDV_Secretaire1_idx` (`Secretaire_idSec`);

--
-- Indexes for table `secretaire`
--
ALTER TABLE `secretaire`
  ADD PRIMARY KEY (`idSec`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `idPat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rdv`
--
ALTER TABLE `rdv`
  MODIFY `idRDV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `secretaire`
--
ALTER TABLE `secretaire`
  MODIFY `idSec` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patient`
--
ALTER TABLE `patient`
  ADD CONSTRAINT `fk_Patient_Secretaire1` FOREIGN KEY (`Secretaire_idSec`) REFERENCES `secretaire` (`idSec`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rdv`
--
ALTER TABLE `rdv`
  ADD CONSTRAINT `fk_RDV_Secretaire1` FOREIGN KEY (`Secretaire_idSec`) REFERENCES `secretaire` (`idSec`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_idpat` FOREIGN KEY (`idPat`) REFERENCES `patient` (`idPat`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
