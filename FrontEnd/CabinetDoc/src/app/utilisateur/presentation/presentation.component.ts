import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
})
export class PresentationComponent implements OnInit {
  save_txt() {
    var k = (<HTMLInputElement>(
      document.getElementsByClassName('note-editable')[0]
    )).innerHTML;
    fetch('http://127.0.0.1:8000/filetxt', {
      method: 'POST',
      body: JSON.stringify({ ch: k }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
      });
  }

  load_txt() {
    fetch('http://127.0.0.1:8000/filetxt')
      .then((res) => res.json())
      .then((data) => {
        (<HTMLInputElement>(
          document.getElementsByClassName('note-editable')[0]
        )).innerHTML = data.content;
      });
  }

  showTemplateForm = false;

  html: string | undefined;

  form: FormGroup;
  config: any = {
    airMode: false,
    tabDisable: true,
    popover: {
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
      ],
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']],
      ],
      link: [['link', ['linkDialogShow', 'unlink']]],
      air: [
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear',
          ],
        ],
      ],
    },
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']],
    ],
    codeviewFilter: true,
    codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
    codeviewIframeFilter: true,
  };

  editorDisabled = false;

  get sanitizedHtml() {
    if (this.form.get('html') != null) {
      return this.sanitizer.bypassSecurityTrustHtml(
        this.form.get('html')?.value
      );
    } else {
      return '';
    }
  }

  constructor(private sanitizer: DomSanitizer) {
    this.form = new FormGroup({
      html: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.load_txt();
  }

  onBlur() {
    console.log('Blur');
  }

  onDelete(file: { url: any }) {
    console.log('Delete file', file.url);
  }

  summernoteInit(event: any) {
    console.log(event);
  }
}
