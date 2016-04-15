var $ = require('jquery')
var loadMap = require('./map')
var Maps = require('../../../lib/models/maps')
var maps = new Maps()

var easting = getParameterByName('easting')
var northing = getParameterByName('northing')

loadMap.loadMap(easting ? [easting, northing] : undefined)

function generateLegend (meta) {
  var str = '<ul>'
  var keys = meta.keys
  var key
  for (var i = 0; i < keys.length; i++) {
    key = keys[i]
    str += '<li class="round ' + key.icon + '"><div>' + key.text + '</div></li>'
  }
  str += '</ul>'
  return str
}

function getParameterByName (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(window.location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

$(function () {
  var selected = 'selected'
  var $container = $('.map-container')
  var $sidebar = $('ul.nav', $container)
  var $selector = $('select', $container)
  var $categories = $sidebar.children('li.category')
  var $maps = $categories.find('li')
  var $description = $('#category-description')
  // Store a reference to the map legend element
  var $legend = $('.legend')

  function setCurrent (ref) {
    maps.setCurrent(ref)

    var currMap = maps.currMap
    var currCategory = maps.currCategory

    // Update the legend
    $legend.html(generateLegend(currMap.legend))

    // Update the main nav
    $categories.removeClass(selected)
    $categories.filter('#' + currCategory.ref).addClass(selected)
    $maps.removeClass(selected)
    $maps.filter('#' + currMap.ref).addClass(selected)

    // Update the description
    $description.html(currCategory.description)

    // Update the mobile nav
    $selector.val(currMap.ref)

    // Load the map
    loadMap.showMap('risk:' + currMap.ref.substring(currMap.ref.indexOf('_') + 1))
  }

  // Default to the first category/map
  loadMap.onReady(function () {
    // Handle the category header clicks
    $categories.on('click', 'h3', function (e) {
      e.preventDefault()
      var $category = $(this).parent()
      if (!$category.hasClass(selected)) {
        setCurrent($category.attr('id'))
      }
    })

    // Handle the map selector clicks
    $maps.on('click', function (e) {
      e.preventDefault()
      setCurrent($(this).attr('id'))
    })

    // Handle the mobile map selector change
    $selector.on('change', function (e) {
      e.preventDefault()
      setCurrent($(this).val())
    })

    setCurrent(getParameterByName('map'))
  })

  $('.feature-popup-closer').click(function () {
    return loadMap.closePopup()
  })

  $('.map-container')
    .on('click', '.map-switch a', function (e) {
      e.preventDefault()
      $(e.delegateTarget).toggleClass('detailed')
    })
})
