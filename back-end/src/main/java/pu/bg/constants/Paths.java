package pu.bg.constants;

import java.nio.file.Path;

public enum Paths {
    ;

    public static final Path COUNTRIES_JSON_PATH = Path.of("src/main/resources/files/json/countries.json");
    public static final Path PEOPLE_JSON_PATH = Path.of("src/main/resources/files/json/people.json");

    public static final Path COMPANIES_XML_PATH = Path.of("src/main/resources/files/xml/companies.xml");
    public static final Path JOBS_XML_PATH = Path.of("src/main/resources/files/xml/jobs.xml");
}
