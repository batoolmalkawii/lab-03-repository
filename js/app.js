'use strict';

let hornsArray = [];
let pushedKeywords = [];
let templateHTML = $('#photo-template').html();

function Horns(horns) {
  for (const key in horns) {
    this[key] = horns[key];
  }
  hornsArray.push(this);
}


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
  let template = $(templateEl).html();
  templateEl.attr('class', this.keyword);
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
    hornsArray = [];
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
    hornsArray = [];
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

$(document).ready(function () {
  $('#byTitle').on('click', function () {
    console.log('titleClicked');
    hornsArray.sort(compareTitles);
    $('section').remove();
    hornsArray.forEach(hornObj => {
      hornObj.render();
    });
  });
  console.log(hornsArray);
});


$(document).ready(function () {
  $('#byHorns').on('click', function () {
    console.log('hornsClicked');
    hornsArray.sort(compareHorns);
    $('section').remove();
    hornsArray.forEach(hornObj => {
      hornObj.render();
    });
    console.log(hornsArray);
  });
});

// helper functions
function compareTitles(a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  let comparison = 0;
  comparison = (titleA > titleB) ? 1 : -1;
  return comparison;
}

function compareHorns(a, b) {
  const hornA = a.horns;
  const hornB = b.horns;
  let comparison = 0;
  comparison = (hornA > hornB) ? 1 : -1;
  return comparison;
}

