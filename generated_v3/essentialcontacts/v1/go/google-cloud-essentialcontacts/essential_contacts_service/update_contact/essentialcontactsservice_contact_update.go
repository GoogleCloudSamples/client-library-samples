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

// [START essentialcontacts_v1_essentialcontactsservice_contact_update]

import (
	"context"
	"fmt"
	"io"

	essentialcontacts "cloud.google.com/go/essentialcontacts/apiv1"
	essentialcontactspb "cloud.google.com/go/essentialcontacts/apiv1/essentialcontactspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateContact updates the preferred language tag of an existing essential contact.
func updateContact(ctx context.Context, w io.Writer, projectID string, contactID string) error {
	// Construct the resource name and targeted field updates.
	// Updating language_tag avoids mutating notification category subscriptions.
	contact := &essentialcontactspb.Contact{
		Name:        fmt.Sprintf("projects/%s/contacts/%s", projectID, contactID),
		LanguageTag: "en-US",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"language_tag"},
	}

	client, err := essentialcontacts.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("essentialcontacts.NewClient: %w", err)
	}
	defer client.Close()

	req := &essentialcontactspb.UpdateContactRequest{
		Contact:    contact,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateContact(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateContact: %w", err)
	}

	fmt.Fprintf(w, "Updated contact: %s\n", resp.GetName())
	return nil
}

// [END essentialcontacts_v1_essentialcontactsservice_contact_update]
