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

// [START essentialcontacts_v1_essentialcontactsservice_contact_create]
import com.google.cloud.essentialcontacts.v1.Contact;
import com.google.cloud.essentialcontacts.v1.EssentialContactsServiceClient;
import com.google.cloud.essentialcontacts.v1.NotificationCategory;

public class CreateContact {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    createContact(projectId);
  }

  public static void createContact(String projectId) throws Exception {
    try (EssentialContactsServiceClient client = EssentialContactsServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);
      Contact contact =
          Contact.newBuilder()
              .setEmail("user@example.com")
              .addNotificationCategorySubscriptions(NotificationCategory.TECHNICAL)
              .setLanguageTag("en-US")
              .build();

      Contact response = client.createContact(parent, contact);
      System.out.println("Created contact: " + response.getName());
    }
  }
}
// [END essentialcontacts_v1_essentialcontactsservice_contact_create]
