

	$ () ->
		body = $('body')

		$('#code').val('')
		
		$('#add-row').on 'click', () ->
			table = $('table')
			selected = $('.selected')
			if selected.length
				row = selected.closest('tr')
			else
				row = table.find('tr:last')
			newrow = row.clone()
			# newrow = $('<tr><td contenteditable="true">&nbsp;</td></tr>')
			# if window.countCols() > 1
				# newrow = $('<tr><td colspan="' + window.countCols() + '" contenteditable="true">&nbsp;</td></tr>')
			row.after(newrow)
			selected.removeClass('selected')
			newrow.find('td').eq(selected.index()).focus().addClass('selected')
			window.source()

		$('#del-row').on 'click', () ->
			selected = $('.selected')
			if selected.length
				if $('tr').length > 1
					selected.closest('tr').remove()
			window.source()

		$('#add-col').on 'click', () ->
			selected = $('.selected')
			if selected.length
				if selected.attr('colspan')
					selected.attr('colspan', eval(selected.attr('colspan')) - 1)
					if selected.attr('colspan') <= 2
						selected.removeAttr('colspan')
				newcol = selected.clone().html('&nbsp;').focus()
				selected.removeClass('selected').after(newcol)
			window.source()

		$('#del-col').on 'click', () ->
			selected = $('.selected')
			if selected.length
				if selected.closest('tr').find('td').length > 1
					selected.remove()
			window.source()

		$('#add-colspan').on 'click', () ->
			selected = $('.selected')
			if selected.length
				if selected.attr('colspan')
					selected.attr('colspan', eval(selected.attr('colspan')) + 1)
				else
					selected.attr('colspan', '2')
			window.source()

		$('#min-colspan').on 'click', () ->
			selected = $('.selected')
			if selected.length
				if selected.attr('colspan')
					selected.attr('colspan', eval(selected.attr('colspan')) - 1)
					if selected.attr('colspan') < 2
						selected.removeAttr('colspan')
			window.source()

		$('#add-rowspan').on 'click', () ->
			selected = $('.selected')
			row = selected.closest('tr')
			rowcols = row.find('td').length
			nextrow = row.next()
			nextrowcols = nextrow.find('td').length
			if selected.length and row.index() < $('tr').length - 1 and nextrowcols < rowcols
				if selected.attr('rowspan')
					selected.attr('rowspan', eval(selected.attr('rowspan')) + 1)
				else
					selected.attr('rowspan', '2')
			window.source()

		$('#min-rowspan').on 'click', () ->
			selected = $('.selected')
			if selected.length
				if selected.attr('rowspan')
					selected.attr('rowspan', eval(selected.attr('rowspan')) - 1)
					if selected.attr('rowspan') < 2
						selected.removeAttr('rowspan')
			window.source()

		$('#make-th, #make-td').on 'click', (event) ->
			selected = $('.selected')
			if selected.length
				p = $('<p></p>')
				p.append(selected.clone())
				t = $('<textarea></textarea>')
				t.val(p.html())
				if $(event.target).attr('id') == 'make-th'
					t.val(t.val().replace(/<td/g, '<th').replace(/<\/td>/g, '</th>'))
				if $(event.target).attr('id') == 'make-td'
					t.val(t.val().replace(/<th/g, '<td').replace(/<\/th>/g, '</td>'))
				selected.replaceWith(t.val())
			window.source()

		body.on 'click', 'td, th', () ->
			elem = $(this)
			selected = $('.selected')
			if elem.hasClass('selected')
				elem.removeClass('selected')
			else
				selected.removeClass('selected')
				elem.addClass('selected')
			console.log(elem.html())

		body.on 'keyup', 'td, th', () ->
			window.source()
			if $(this).html() == '<br>'
				$(this).html('')

	############################################## ##############################################

	window.countCols = () ->
		cols = 1
		$('tr').each ->
			if $('td', this).length > cols
				cols = $('td', this).length
		return cols

	window.source = () ->
		table = $('table').clone()
		html = table.find('td, th').removeAttr('contenteditable')
		code = $('<p></p>').append(table)
		$('#code').val(code.html())
		$('#code').val($('#code').val().replace(/<table>/g, '<table>\n'))
		$('#code').val($('#code').val().replace(/<tbody>/g, '\t<tbody>\n'))
		$('#code').val($('#code').val().replace(/<\/tbody>/g, '\t</tbody>\n'))
		$('#code').val($('#code').val().replace(/<tr>/g, '\t\t<tr>\n'))
		$('#code').val($('#code').val().replace(/<\/tr>/g, '\t\t</tr>\n'))
		$('#code').val($('#code').val().replace(/<td/g, '\t\t\t<td'))
		$('#code').val($('#code').val().replace(/<br><\/td>/g, '</td>'))
		$('#code').val($('#code').val().replace(/<\/td>/g, '</td>\n'))
		$('#code').val($('#code').val().replace(/<th/g, '\t\t\t<th'))
		$('#code').val($('#code').val().replace(/<\/th>/g, '</th>\n'))
		$('#code').val($('#code').val().replace(/selected/g, ''))