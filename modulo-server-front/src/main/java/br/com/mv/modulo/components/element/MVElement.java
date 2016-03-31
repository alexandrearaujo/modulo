package br.com.mv.modulo.components.element;

import java.util.Collections;
import java.util.List;

import org.thymeleaf.dom.Element;

import br.com.mv.modulo.components.element.attributes.KoAttr;
import br.com.mv.modulo.components.element.attributes.KoBinding;
import br.com.mv.modulo.components.element.attributes.KoCss;
import br.com.mv.modulo.components.element.attributes.KoDataBind;
import br.com.mv.modulo.components.element.attributes.KoEvent;
import lombok.Getter;
import lombok.Setter;

public abstract class MVElement {

	@Getter @Setter
	protected Element el;

	@Getter
	protected KoCss koCss;

	@Getter
	protected KoAttr koAttr;

	@Getter
	protected KoBinding koBinding;

	@Getter
	protected KoEvent koEvent;

	protected List<String> htmlClass;

	public MVElement(Element context) {
		koAttr = new KoAttr();
		koBinding = new KoBinding();
		koEvent = new KoEvent();
		koCss = new KoCss();
	}

	public List<String> getHtmlClass() {
		return Collections.unmodifiableList(htmlClass);
	}

	public void addHtmlClass(String htmlClass) {
		this.htmlClass.add(htmlClass);
	}

	private String getDataBind() {
		KoDataBind dataBind = new KoDataBind();

		dataBind.add(koBinding);
		dataBind.add(koEvent);
		dataBind.add(koAttr);
		dataBind.add(koCss);
		
		return dataBind.stringify();
	}

	public MVElement render() {
		el.setAttribute("data-bind", getDataBind());
		return this;
	}
}
