module ApplicationHelper
	def title(page_title)
		content_for(:title) { page_title }
	end

	def service_string(service_num)
		case service_num
		when 1
			"종일 (9시~5시). 70,000원"
		when 2
			"오전 (9시~1시). 40,000원"
		when 3
			"오후 (2시~6시). 40,000원"
		else
			"준비중 입니다"
		end
	end

	def service_time_string(service_num)
		case service_num
		when 1
			"종일스케쥴로 오전 9시부터 오후 5시까지"
		when 2
			"오전스케쥴로 오전 9시부터 오후 1시까지"
		when 3
			"오후스케쥴로 오후 2시부터 오후 6시까지"
		else
			"준비중 입니다"
		end
	end
end
