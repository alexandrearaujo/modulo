---
layout: default
title: Arquitetura
description: Documentação da arquitetura do novo framework. 
---

![Diagrama](assets/images/component.png)




    @Controller
    @RequestMapping("/novoTeste")
    @SessionAttributes(types = NovoTeste.class)
    public class DemoController extends GenericCrudController<NovoTeste> {
    
    	@Autowired
    	public DemoController(GenericMessages genericMessages, NovoTesteBusiness novoTesteBusiness) {
    		super(genericMessages, novoTesteBusiness);
    	}
    	
    }

```java
@Controller
@RequestMapping("/novoTeste")
@SessionAttributes(types = NovoTeste.class)
public class DemoController extends GenericCrudController<NovoTeste> {
    
	@Autowired
	public DemoController(GenericMessages genericMessages, NovoTesteBusiness novoTesteBusiness) {
		super(genericMessages, novoTesteBusiness);
	}
    	
}
```


{% highlight java %}
@Controller
@RequestMapping("/novoTeste")
@SessionAttributes(types = NovoTeste.class)
public class DemoController extends GenericCrudController<NovoTeste> {
    
	@Autowired
	public DemoController(GenericMessages genericMessages, NovoTesteBusiness novoTesteBusiness) {
		super(genericMessages, novoTesteBusiness);
	}
    	
}
{% endhighlight %}


{% highlight ruby %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}
