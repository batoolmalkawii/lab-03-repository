'use strict';


let templateHTML = $('#photo-template').html();
function Horns(horns) {
  for (const key in horns) {
    this[key] = horns[key];
  }

}

let pushedKeywords = [];

Horns.prototype.renderKeywords = function () {
  if (!(pushedKeywords.includes(this.keyword))) {
    let newOption = $('<option></option>').text(this.keyword);
    newOption.attr('class', 'newOptions');
    $('select').append(newOption);
    pushedKeywords.push(this.keyword);
  }
};
Horns.prototype.render = function () {
  this.renderKeywords();
  let templateEl = $('<section></section>');
  templateEl.html(templateHTML);
  // templateEl.attr('class', 'template')
  let template = $(templateEl).html();
  let html = Mustache.render(template, this);
  templateEl.html(html);
  $('main').append(templateEl);
};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

let jsonPath = 'data/page-1.json';

$.ajax(jsonPath, ajaxSettings).then((data) => {
  data.forEach(hornsObj => {
    let horns = new Horns(hornsObj);
    horns.render();
  });
});

$(document).ready(function () {
  $('select').on('change', function () {
    let selected = this.value;
    $('section').hide();
    $(`.${selected}`).show();
  });
});

$(document).ready(function () {
  $('#page2').on('click', function () {
    jsonPath = 'data/page-2.json';
    $('section').remove();
    $('.newOptions').remove();
    ajaxLoad(jsonPath);
  });
});

$(document).ready(function () {
  $('#page1').on('click', function () {
    if (jsonPath === 'data/page-2.json') {
      $('.newOptions').remove();
      pushedKeywords = [];
      jsonPath = 'data/page-1.json';
    }
    $('section').remove();
    ajaxLoad(jsonPath);
  });
});


function ajaxLoad(jsonPath) {
  $.ajax(jsonPath, ajaxSettings).then(data => {
    data.forEach(hornsObj => {
      let horns = new Horns(hornsObj);

      horns.render();
    });
  });
}
