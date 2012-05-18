(function() {

  $(function() {
    var body;
    body = $('body');
    $('#code').val('');
    window.source();
    $('#toggle-html').on('click', function() {
      return $('#code').toggle();
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
      newrow.find('td').html('&nbsp;');
      row.after(newrow);
      selected.removeClass('selected');
      newrow.find('td').eq(selected.index()).focus().addClass('selected');
      return window.source();
    });
    $('#del-row').on('click', function() {
      var selected;
      selected = $('.selected');
      if (selected.length) if ($('tr').length > 1) selected.closest('tr').remove();
      return window.source();
    });
    $('#add-col').on('click', function() {
      var newcol, selected;
      selected = $('.selected');
      if (selected.length) {
        if (selected.attr('colspan')) {
          selected.attr('colspan', eval(selected.attr('colspan')) - 1);
          if (selected.attr('colspan') <= 2) selected.removeAttr('colspan');
        }
        newcol = selected.clone().html('&nbsp;').focus();
        selected.removeClass('selected').after(newcol);
      }
      return window.source();
    });
    $('#del-col').on('click', function() {
      var selected;
      selected = $('.selected');
      if (selected.length) {
        if (selected.closest('tr').find('td').length > 1) selected.remove();
      }
      return window.source();
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
      var nextrow, nextrowcols, row, rowcols, selected;
      selected = $('.selected');
      row = selected.closest('tr');
      rowcols = row.find('td').length;
      nextrow = row.next();
      nextrowcols = nextrow.find('td').length;
      if (selected.length && row.index() < $('tr').length - 1 && nextrowcols < rowcols) {
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
        elem.removeClass('selected');
      } else {
        selected.removeClass('selected');
        elem.addClass('selected');
      }
      return console.log(elem.html());
    });
    return body.on('keyup', 'td, th', function() {
      window.source();
      if ($(this).html() === '<br>') return $(this).html('');
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
    var code, html, table;
    table = $('table').clone();
    html = table.find('td, th').removeAttr('contenteditable');
    code = $('<p></p>').append(table);
    $('#code').val(code.html());
    $('#code').val($('#code').val().replace(/<table>/g, '<table>\n'));
    $('#code').val($('#code').val().replace(/<tbody>/g, '\t<tbody>\n'));
    $('#code').val($('#code').val().replace(/<\/tbody>/g, '\t</tbody>\n'));
    $('#code').val($('#code').val().replace(/<tr>/g, '\t\t<tr>\n'));
    $('#code').val($('#code').val().replace(/<\/tr>/g, '\t\t</tr>\n'));
    $('#code').val($('#code').val().replace(/<td/g, '\t\t\t<td'));
    $('#code').val($('#code').val().replace(/<br><\/td>/g, '</td>'));
    $('#code').val($('#code').val().replace(/<\/td>/g, '</td>\n'));
    $('#code').val($('#code').val().replace(/<th/g, '\t\t\t<th'));
    $('#code').val($('#code').val().replace(/<\/th>/g, '</th>\n'));
    $('#code').val($('#code').val().replace(/selected/g, ''));
    $('#code').val($('#code').val().replace(/clas/g, ''));
    return $('#code').val($('#code').val().replace(/\ s=""/g, ''));
  };

}).call(this);
