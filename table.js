(function() {
  var updTextareaHeight;

  $(function() {
    var body;
    body = $('body');
    $('#code').val('');
    window.source();
    $('#toggle-html').on('click', function() {
      return $('#code').toggle();
    });
    $('#make-table').on('click', function() {
      $('#new-table-columns, #new-table-rows').val('3');
      return $('#new-table').slideDown('fast');
    });
    $('#cancel-new-table').on('click', function() {
      return $('#new-table').slideUp('fast');
    });
    $('#create-new-table').on('click', function() {
      var cols, i, newcols, newrows, rows, table;
      table = $('<table><tbody></tbody></table>');
      rows = eval($('#new-table-rows').val());
      cols = eval($('#new-table-columns').val());
      if (rows > 0 && cols > 0) {
        newrows = '';
        newcols = '';
        i = 0;
        while (i < cols) {
          newcols += '<td contenteditable="true">type here</td>';
          i++;
        }
        i = 0;
        while (i < rows) {
          newrows += '<tr>' + newcols + '</tr>';
          i++;
        }
        table.append(newrows);
        $('table').replaceWith(table);
        $('#new-table').slideUp('fast');
        return window.source();
      }
    });
    $('#add-row').on('click', function() {
      var newrow, row, selected, table;
      table = $('table');
      selected = $('.selected');
      if (selected.length) {
        row = selected.closest('tr');
      } else {
        row = table.find('tr:last');
      }
      newrow = row.clone();
      newrow.find('td').removeClass('selected').html('type here');
      row.after(newrow);
      return window.source();
    });
    $('#del-row').on('click', function() {
      var selected;
      selected = $('.selected');
      if (selected.length) if ($('tr').length > 1) selected.closest('tr').remove();
      $('td').each(function() {
        return window.fixColspan(this);
      });
      return window.source();
    });
    $('#add-col').on('click', function() {
      var newcol;
      newcol = $('td').first().clone();
      newcol.removeClass('selected').html('type here');
      $('tr').append(newcol);
      return window.source();
    });
    $('#del-col').on('click', function() {
      var row, selected;
      selected = $('.selected');
      if (selected.length) {
        row = selected.closest('tr');
        if (row.find('td').length === 1) {
          row.remove();
        } else {
          selected.remove();
        }
        return window.source();
      }
    });
    $('#add-colspan').on('click', function() {
      var selected;
      selected = $('.selected');
      if (selected.length) {
        if (selected.attr('colspan')) {
          selected.attr('colspan', eval(selected.attr('colspan')) + 1);
        } else {
          selected.attr('colspan', '2');
        }
      }
      return window.source();
    });
    $('#min-colspan').on('click', function() {
      var selected;
      selected = $('.selected');
      if (selected.length) {
        if (selected.attr('colspan')) {
          selected.attr('colspan', eval(selected.attr('colspan')) - 1);
          if (selected.attr('colspan') < 2) selected.removeAttr('colspan');
        }
      }
      return window.source();
    });
    $('#add-rowspan').on('click', function() {
      var row, selected;
      selected = $('.selected');
      if (selected.length) {
        row = selected.closest('tr');
        if (selected.attr('rowspan')) {
          selected.attr('rowspan', eval(selected.attr('rowspan')) + 1);
        } else {
          selected.attr('rowspan', '2');
        }
      }
      return window.source();
    });
    $('#min-rowspan').on('click', function() {
      var selected;
      selected = $('.selected');
      if (selected.length) {
        if (selected.attr('rowspan')) {
          selected.attr('rowspan', eval(selected.attr('rowspan')) - 1);
          if (selected.attr('rowspan') < 2) selected.removeAttr('rowspan');
        }
      }
      return window.source();
    });
    $('#make-th, #make-td').on('click', function(event) {
      var p, selected, t;
      selected = $('.selected');
      if (selected.length) {
        p = $('<p></p>');
        p.append(selected.clone());
        t = $('<textarea></textarea>');
        t.val(p.html());
        if ($(event.target).attr('id') === 'make-th') {
          t.val(t.val().replace(/<td/g, '<th').replace(/<\/td>/g, '</th>'));
        }
        if ($(event.target).attr('id') === 'make-td') {
          t.val(t.val().replace(/<th/g, '<td').replace(/<\/th>/g, '</td>'));
        }
        selected.replaceWith(t.val());
      }
      return window.source();
    });
    body.on('click', 'td, th', function() {
      var elem, selected;
      elem = $(this);
      selected = $('.selected');
      if (elem.hasClass('selected')) {
        return elem.removeClass('selected');
      } else {
        selected.removeClass('selected');
        return elem.addClass('selected');
      }
    });
    return body.on('keyup', 'td, th', function() {
      return window.source();
    });
  });

  window.countCols = function() {
    var cols;
    cols = 1;
    $('tr').each(function() {
      if ($('td', this).length > cols) return cols = $('td', this).length;
    });
    return cols;
  };

  window.source = function() {
    var code, html, source, table;
    table = $('table').clone();
    html = table.find('td, th').removeAttr('contenteditable');
    source = $('<p></p>').append(table);
    code = $('#code');
    code.val(source.html().replace(/<table>/g, '<table>\n').replace(/<tbody>/g, '\t<tbody>\n').replace(/<\/tbody>/g, '\t</tbody>\n').replace(/<tr>/g, '\t\t<tr>\n').replace(/<\/tr>/g, '\t\t</tr>\n').replace(/<td/g, '\t\t\t<td').replace(/<br><\/td>/g, '</td>').replace(/<\/td>/g, '</td>\n').replace(/\ <\/td>/g, '</td>').replace(/<br><\/td>/g, '</td>').replace(/<th/g, '\t\t\t<th').replace(/\ <\/th>/g, '</th>').replace(/<br><\/th>/g, '</th>').replace(/<\/th>/g, '</th>\n').replace(/selected/g, '').replace(/clas/g, '').replace(/\ s=""/g, ''));
    return updTextareaHeight();
  };

  updTextareaHeight = function() {
    var content, div, height;
    content = '<pre>' + $('#code').val().replace(/</g, '@').replace(/>/g, '@') + '</pre>';
    div = $('<div class="code"></div>').append(content);
    div.appendTo('body');
    height = div.outerHeight();
    return $('#code').css('height', height);
  };

}).call(this);
