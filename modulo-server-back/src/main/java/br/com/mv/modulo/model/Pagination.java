package br.com.mv.modulo.model;

import java.io.IOException;
import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
public class Pagination<T> implements Serializable{

	private ObjectMapper mapper = new ObjectMapper();
	
	@Setter @Getter
	private Integer currentPage;
	
	@Setter @Getter
	private Integer totalPages;
	
	@Setter @Getter
	private String order;
	
	@Setter @Getter
	private String sortColumn;
	
	@Setter @Getter
	private String search;
	
	@Setter
	private String data;
	
	public Pageable getPageable(){
		
		if(!StringUtils.isBlank(order) && !StringUtils.isBlank(sortColumn)){
			return new PageRequest(currentPage, totalPages, Sort.Direction.fromString(order), sortColumn);
		}
		
		if(!StringUtils.isBlank(order)){
			return new PageRequest(currentPage, totalPages, Sort.Direction.fromString(order));
			
		}
		
		return new PageRequest(currentPage, totalPages );
	}
	
	public T getData(Class<T> clazz){
		if(this.data != null){
			try {
				return mapper.readValue(this.data, clazz);
			} catch (IOException e) {
			}
		}
		return null;
	}
	
}
