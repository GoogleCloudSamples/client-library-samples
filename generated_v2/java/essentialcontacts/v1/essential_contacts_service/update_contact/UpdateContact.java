// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.essentialcontacts.v1;

// [START essentialcontacts_v1_essentialcontactsservice_contact_update]
import com.google.cloud.essentialcontacts.v1.Contact;
import com.google.cloud.essentialcontacts.v1.ContactName;
import com.google.cloud.essentialcontacts.v1.EssentialContactsServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateContact {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String contactId = "example-contact-id";
    updateContact(projectId, contactId);
  }

  public static void updateContact(String projectId, String contactId) throws Exception {
    try (EssentialContactsServiceClient client = EssentialContactsServiceClient.create()) {
      // The name field binds the HTTP request path and must be specified.
      Contact contact =
          Contact.newBuilder()
              .setName(ContactName.of(projectId, contactId).toString())
              .setLanguageTag("en")
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("language_tag").build();

      Contact updatedContact = client.updateContact(contact, updateMask);
      System.out.println("Updated contact: " + updatedContact.getName());
      System.out.println("Language tag: " + updatedContact.getLanguageTag());
    }
  }
}
// [END essentialcontacts_v1_essentialcontactsservice_contact_update]
