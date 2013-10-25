module ApplicationHelper
	def title(page_title)
		content_for(:title) { page_title }
	end

	def service_string(service_num)
		case service_num
		when 1
			"종일 (9시~5시)"
		when 2
			"오전 (9시~1시)"
		when 3
			"오후 (2시~6시)"
		else
			"준비중 입니다"
		end
	end
end
