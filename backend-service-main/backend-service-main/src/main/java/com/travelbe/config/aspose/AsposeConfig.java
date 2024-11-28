package com.travelbe.config.aspose;

import com.aspose.cells.License;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class AsposeConfig {
    @PostConstruct
    void init() {
        try (InputStream is = License.class.getResourceAsStream("/com.aspose.cells.lic_2999.xml")) {
            License asposeLicense = new License();
            asposeLicense.setLicense(is);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
