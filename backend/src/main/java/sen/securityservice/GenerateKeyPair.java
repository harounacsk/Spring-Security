package sen.securityservice;

import org.bouncycastle.util.io.pem.PemObject;
import org.bouncycastle.util.io.pem.PemWriter;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;

public class GenerateKeyPair {
  public static void main(String[] args) throws NoSuchAlgorithmException, IOException {
    String path = "/security-service/src/main/resources/";
    KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
    KeyPair keyPair = keyPairGenerator.generateKeyPair();
    byte[] pub = keyPair.getPublic().getEncoded();
    byte[] pri = keyPair.getPrivate().getEncoded();
    System.out.println(System.getProperty("user.dir"));

    try (PemWriter pemWriter = new PemWriter(new OutputStreamWriter(new FileOutputStream(System.getProperty("user.dir") + path + "pub.pem")));
         PemWriter pemWriter2 = new PemWriter(new OutputStreamWriter(new FileOutputStream(System.getProperty("user.dir") + path + "pri.pem")))) {

      PemObject pemObject = new PemObject("PUBLIC KEY", pub);
      pemWriter.writeObject(pemObject);

      PemObject pemObject2 = new PemObject("PRIVATE KEY", pri);
      pemWriter2.writeObject(pemObject2);
    }


  }
}