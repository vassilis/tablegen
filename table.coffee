

	$ () ->
		body = $('body')

		$('#code').val('')
		window.source()

		$('#toggle-html').on 'click', () ->
			$('#code').toggle()

		$('#make-table').on 'click', () ->
			$('#new-table-columns, #new-table-rows').val('3')
			$('#new-table').slideDown('fast')

		$('#cancel-new-table').on 'click', () ->
			$('#new-table').slideUp('fast')

		$('#create-new-table').on 'click', () ->
			table = $('<table><tbody></tbody></table>')
			rows = eval($('#new-table-rows').val())
			cols = eval($('#new-table-columns').val())
			if rows > 0 and cols > 0
				newrows = ''
				newcols = ''
				i = 0
				while i < cols
					newcols += '<td contenteditable="true">type here</td>'
					i++
				i = 0
				while i < rows
					newrows += '<tr>' + newcols + '</tr>'
					i++
				table.append(newrows)
				$('table').replaceWith(table)
				$('#new-table').slideUp('fast')
				window.source()

		$('#add-row').on 'click', () ->
			table = $('table')
			selected = $('.selected')
			if selected.length
				row = selected.closest('tr')
			else
				row = table.find('tr:last')
			newrow = row.clone()
			newrow.find('td').removeClass('selected').html('type here')
			row.after(newrow)
			window.source()

		$('#del-row').on 'click', () ->
			selected = $('.selected')
			if selected.length
				if $('tr').length > 1
					selected.closest('tr').remove()
			$('td').each ->
				window.fixColspan(this)
			window.source()

		$('#add-col').on 'click', () ->
			newcol = $('td').first().clone()
			newcol.removeClass('selected').html('type here')
			$('tr').append(newcol)
			window.source()

		$('#del-col').on 'click', () ->
			selected = $('.selected')
			if selected.length
				row = selected.closest('tr')
				if row.find('td').length == 1
					row.remove()
				else
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
			if selected.length
				row = selected.closest('tr')
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
			if elem.html() == '&nbsp;'
				elem.html('')

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
		source = $('<p></p>').append(table)
		code = $('#code')
		code.val(
			source.html()
			.replace(/<table>/g, '<table>\n')
			.replace(/<tbody>/g, '\t<tbody>\n')
			.replace(/<\/tbody>/g, '\t</tbody>\n')
			.replace(/<tr>/g, '\t\t<tr>\n')
			.replace(/<\/tr>/g, '\t\t</tr>\n')
			.replace(/<td/g, '\t\t\t<td')
			.replace(/<br><\/td>/g, '</td>')
			.replace(/<\/td>/g, '</td>\n')
			.replace(/\ <\/td>/g, '</td>')
			.replace(/<br><\/td>/g, '</td>')
			.replace(/<th/g, '\t\t\t<th')
			.replace(/\ <\/th>/g, '</th>')
			.replace(/<br><\/th>/g, '</th>')
			.replace(/<\/th>/g, '</th>\n')
			.replace(/selected/g, '')
			.replace(/clas/g, '')
			.replace(/\ s=""/g, '')
		)
		updTextareaHeight()

	updTextareaHeight = () ->
		content = '<pre>' + $('#code').val().replace(/</g, '@').replace(/>/g, '@') + '</pre>'
		div = $('<div></div>').append(content)
		div.appendTo('body')
		height = div.outerHeight()
		div.remove()
		$('#code').css('height', height)