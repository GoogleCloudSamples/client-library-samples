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

// [START essentialcontacts_v1_essentialcontactsservice_contacts_list]
import com.google.cloud.essentialcontacts.v1.Contact;
import com.google.cloud.essentialcontacts.v1.EssentialContactsServiceClient;
import com.google.cloud.essentialcontacts.v1.ListContactsRequest;

public class ListContacts {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listContacts(projectId);
  }

  public static void listContacts(String projectId) throws Exception {
    try (EssentialContactsServiceClient client = EssentialContactsServiceClient.create()) {
      String parent = String.format("projects/%s", projectId);
      ListContactsRequest request = ListContactsRequest.newBuilder()
          .setParent(parent)
          .build();

      for (Contact contact : client.listContacts(request).iterateAll()) {
        System.out.println("Contact name: " + contact.getName());
        System.out.println("Email: " + contact.getEmail());
      }
    }
  }
}
// [END essentialcontacts_v1_essentialcontactsservice_contacts_list]
