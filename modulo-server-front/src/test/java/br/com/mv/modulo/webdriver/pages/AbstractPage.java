package br.com.mv.modulo.webdriver.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class AbstractPage {
	
	protected WebDriver driver;

	@FindBy(css = "label.error, .alert-error")
	private WebElement errors;

	
	public AbstractPage(WebDriver driver) {
		this.driver = driver;
	}

	
	public String getErrors() {
		return errors.getText();
	}

    static void get(WebDriver driver, String relativeUrl) {
        String url = "http://localhost:8080/modulo/" + relativeUrl;
        driver.get(url);
    }
    
    protected void get(String relativeUrl) {
    	String url = "http://localhost:8080/modulo/" + relativeUrl;
    	driver.get(url);
    }
}
