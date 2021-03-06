/*
 * Copyright 2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.data.jpa.domain.support;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import org.springframework.data.convert.Jsr310Converters.DateToInstantConverter;
import org.springframework.data.convert.Jsr310Converters.DateToLocalDateConverter;
import org.springframework.data.convert.Jsr310Converters.DateToLocalDateTimeConverter;
import org.springframework.data.convert.Jsr310Converters.DateToLocalTimeConverter;
import org.springframework.data.convert.Jsr310Converters.InstantToDateConverter;
import org.springframework.data.convert.Jsr310Converters.LocalDateTimeToDateConverter;
import org.springframework.data.convert.Jsr310Converters.LocalDateToDateConverter;
import org.springframework.data.convert.Jsr310Converters.LocalTimeToDateConverter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

/**
 * JPA 2.1 converters to turn JSR-310 types into legacy {@link Date}s. To activate these converters make sure your
 * persistence provider detects them by including this class in the list of mapped classes. In Spring environments, you
 * can simply register the package of this class (i.e. {@code org.springframework.data.jpa.domain.support}) as package
 * to be scanned on e.g. the {@link LocalContainerEntityManagerFactoryBean}.
 * 
 * @author Oliver Gierke
 */
public class Jsr310JpaConverters {

	@Converter(autoApply = true)
	public static class LocalDateConverter implements AttributeConverter<LocalDate, Date> {

		@Override
		public Date convertToDatabaseColumn(LocalDate date) {
			return LocalDateToDateConverter.INSTANCE.convert(date);
		}

		@Override
		public LocalDate convertToEntityAttribute(Date date) {
			return DateToLocalDateConverter.INSTANCE.convert(date);
		}
	}

	@Converter(autoApply = true)
	public static class LocalTimeConverter implements AttributeConverter<LocalTime, Date> {

		@Override
		public Date convertToDatabaseColumn(LocalTime time) {
			return LocalTimeToDateConverter.INSTANCE.convert(time);
		}

		@Override
		public LocalTime convertToEntityAttribute(Date date) {
			return DateToLocalTimeConverter.INSTANCE.convert(date);
		}
	}

	@Converter(autoApply = true)
	public static class LocalDateTimeConverter implements AttributeConverter<LocalDateTime, Date> {

		@Override
		public Date convertToDatabaseColumn(LocalDateTime date) {
			return LocalDateTimeToDateConverter.INSTANCE.convert(date);
		}

		@Override
		public LocalDateTime convertToEntityAttribute(Date date) {
			return DateToLocalDateTimeConverter.INSTANCE.convert(date);
		}
	}

	@Converter(autoApply = true)
	public static class InstantConverter implements AttributeConverter<Instant, Date> {

		@Override
		public Date convertToDatabaseColumn(Instant instant) {
			return InstantToDateConverter.INSTANCE.convert(instant);
		}

		@Override
		public Instant convertToEntityAttribute(Date date) {
			return DateToInstantConverter.INSTANCE.convert(date);
		}
	}
}
