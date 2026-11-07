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

package main

// [START essentialcontacts_v1_essentialcontactsservice_contact_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	essentialcontacts "cloud.google.com/go/essentialcontacts/apiv1"
	"cloud.google.com/go/essentialcontacts/apiv1/essentialcontactspb"
)

// createContact creates an essential contact for a Google Cloud project.
func createContact(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	contact := &essentialcontactspb.Contact{
		Email: fmt.Sprintf("user-%d@example.com", time.Now().UnixNano()),
		NotificationCategorySubscriptions: []essentialcontactspb.NotificationCategory{
			essentialcontactspb.NotificationCategory_TECHNICAL,
		},
		LanguageTag: "en-US",
	}

	client, err := essentialcontacts.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &essentialcontactspb.CreateContactRequest{
		Parent:  parent,
		Contact: contact,
	}

	resp, err := client.CreateContact(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateContact: %w", err)
	}

	fmt.Fprintf(w, "Created contact: %s\n", resp.GetName())
	return nil
}

// [END essentialcontacts_v1_essentialcontactsservice_contact_create]
