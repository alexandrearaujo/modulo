package br.com.mv.modulo.webdriver.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends AbstractPage {
	
	@CacheLookup
	private WebElement username;

	@CacheLookup
    private WebElement password;

    @FindBy(id="login")
    @CacheLookup
    private WebElement submit;

    
    public LoginPage(WebDriver driver) {
        super(driver);
        get("/login");
        PageFactory.initElements(driver, this);
    }
    

    public void login(String username, String password) {
        this.username.sendKeys(username);
        this.password.sendKeys(password);
        this.submit.click();
    }
}
