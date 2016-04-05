package br.com.mv.modulo.components.element.container;

import java.util.ArrayList;
import java.util.List;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Element;

import br.com.mv.modulo.components.element.MVElement;

public abstract class MVContainer extends MVElement{
	private List<MVElement> nodes;
	
	public MVContainer(Arguments arguments, Element context){
		super(arguments, context);
		
		this.nodes = new ArrayList<>();
	}
	
	public void addChild(MVElement mvElement){
		nodes.add(mvElement);
	}
	
	private void renderChildren(){
		nodes.stream()
			 .forEach(mvEl -> this.el.addChild(mvEl.render().getEl()));
	}
	
	@Override
	public MVElement render() {
		renderChildren();
		return super.render();
	}
}
