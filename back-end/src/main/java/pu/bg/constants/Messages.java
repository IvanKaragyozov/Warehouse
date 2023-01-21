package pu.bg.constants;

public enum Messages {
    ;

    public final static String INVALID_DATA = "Invalid %s";

    public final static String SUCCESSFUL_COUNTRY_IMPORT = "Successfully imported country %s - %s";

    public final static String SUCCESSFUL_PERSON_IMPORT = "Successfully imported person %s %s";

    public final static String SUCCESSFUL_COMPANY_IMPORT = "Successfully imported company %s - %d";

    public final static String SUCCESSFUL_JOB_IMPORT = "Successfully imported job %s";

    public final static String EXPORT_FORMAT = """
            Job title %s
            -Salary: %.2f
            --Hours a week: %sh.
            """;
}
