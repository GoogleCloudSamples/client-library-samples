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

// [START essentialcontacts_v1_essentialcontactsservice_contact_delete]
import com.google.cloud.essentialcontacts.v1.ContactName;
import com.google.cloud.essentialcontacts.v1.EssentialContactsServiceClient;

public class DeleteContact {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String contactId = "example-contact_id";
    deleteContact(projectId, contactId);
  }

  public static void deleteContact(String projectId, String contactId) throws Exception {
    try (EssentialContactsServiceClient client = EssentialContactsServiceClient.create()) {
      String name = ContactName.ofProjectContactName(projectId, contactId).toString();
      client.deleteContact(name);
      System.out.printf("Deleted contact: %s%n", name);
    }
  }
}
// [END essentialcontacts_v1_essentialcontactsservice_contact_delete]
