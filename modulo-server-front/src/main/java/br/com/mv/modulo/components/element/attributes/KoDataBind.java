package br.com.mv.modulo.components.element.attributes;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;

@SuppressWarnings("serial")
public class KoDataBind extends ArrayList<MVAttribute>{

	public String stringify() {

		if (this.isEmpty()) {
			return StringUtils.EMPTY;
		}

		StringBuilder json = new StringBuilder();
		List<String> bindings = this.stream().filter(attr-> !attr.map.isEmpty())
											 .map(attr->attr.stringify()).collect(Collectors.toList());
		json.append(StringUtils.removeStart(bindings.toString(), "["));
		return StringUtils.removeEnd(json.toString(), "]");
	}
}
