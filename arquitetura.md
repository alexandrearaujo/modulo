---
layout: default
title: Arquitetura
description: Documentação da arquitetura do novo framework. 
---

![Diagrama](assets/images/component.png)



##GenericCrudController

   Classe abstrata com métodos padrões de CRUD para manipulação da view.

   Os Métodos:

 **URIs**

```java 
@RequestMapping(value={"/", "/list"}, method = RequestMethod.GET)
```

  - Instancia um novo objeto;
  - Anula as possíveis páginas da paginação;
  - Direciona para a página de listagem;

```java 
@RequestMapping(value="/list", method = RequestMethod.POST)
```
 - 


```java 
@RequestMapping(value="/listPaginated", method = RequestMethod.GET)
```

```java 
@RequestMapping(value="/new", method = RequestMethod.GET)
```

```java 
@RequestMapping(value="/delete", method = RequestMethod.GET)
```

```java 
@RequestMapping(value="/edit", method = RequestMethod.GET)
```

```java 
@RequestMapping(value="/save", method = RequestMethod.POST)
```

```java 
@RequestMapping(value={"/returnToList"}, method = RequestMethod.GET)
```


####Exemplo de utilização do GenericCrudController

#####*DemoController.java*

```java
@Controller
@RequestMapping("/demo")
@SessionAttributes(types = Demo.class)
public class DemoController extends GenericCrudController<Demo> {
    
    @Autowired
    public DemoController(GenericMessages genericMessages, DemoBusiness demoBusiness) {
        super(genericMessages, demoBusiness);
    }
        
}
```

##GenericCrudBusiness

####Exemplo de utilização do GenericCrudBusiness

#####*DemoBusiness.java*

```java
@Service
@Transactional(readOnly=true)
public class DemoBusiness extends GenericCrudBusiness<Demo, DemoRepository> {

    @Autowired
    public DemoBusiness(DemoRepository demoRepository) {
        super(demoRepository);
    }
    
    @Override
    public Page<Demo> listModel(Demo demo, Pageable pageable) {
        if (StringUtils.isNotBlank(demo.getDescricao())) {
            return repository.findByDescricaoContainingIgnoreCase(demo.getDescricao(), pageable);
        } else {
            return repository.findAll(pageable);
        }
    }
}
```

##GenericCrudRepository

####Exemplo de utilização do GenericCrudRepository

#####*DemoRepository.java*

```java
@Repository
public interface DemoRepository extends GenericCrudRepository<Demo> {
    
    public Page<Demo> findByDescricaoLikeIgnoreCase(String descricao, Pageable pageable);
    public Page<Demo> findAll(Pageable pageable);

}
```