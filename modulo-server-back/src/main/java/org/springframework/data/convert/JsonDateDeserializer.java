package org.springframework.data.convert;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.node.TextNode;

public class JsonDateDeserializer extends JsonDeserializer<LocalDate> {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(JsonDateDeserializer.class);
	
	@Override
	//TODO: Polish
    public LocalDate deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        ObjectCodec oc = jp.getCodec();
        TextNode node = (TextNode) oc.readTree(jp);
        String dateString = node.textValue();
        
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date dateToConvert = null;
		try {
			dateToConvert = formatter.parse(dateString);
		} catch (ParseException e) {
			LOGGER.error("Não foi possivel realizar o parse de String para LocalDate: ", e);
		}
        
        Instant instant = dateToConvert.toInstant();
        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return LocalDate.of(dateTime.getYear(), dateTime.getMonth(), dateTime.getDayOfMonth());
    }
}