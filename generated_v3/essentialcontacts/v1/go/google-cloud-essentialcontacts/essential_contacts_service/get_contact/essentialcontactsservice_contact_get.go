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

// [START essentialcontacts_v1_essentialcontactsservice_contact_get]

import (
	"context"
	"fmt"
	"io"

	essentialcontacts "cloud.google.com/go/essentialcontacts/apiv1"
	essentialcontactspb "cloud.google.com/go/essentialcontacts/apiv1/essentialcontactspb"
)

// getContact retrieves an essential contact configured on a Google Cloud project.
func getContact(ctx context.Context, w io.Writer, projectID string, contactID string) error {
	name := fmt.Sprintf("projects/%s/contacts/%s", projectID, contactID)

	client, err := essentialcontacts.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &essentialcontactspb.GetContactRequest{
		Name: name,
	}

	contact, err := client.GetContact(ctx, req)
	if err != nil {
		return fmt.Errorf("GetContact failed: %w", err)
	}

	fmt.Fprintf(w, "Contact Name: %s\n", contact.GetName())
	fmt.Fprintf(w, "Contact Email: %s\n", contact.GetEmail())

	return nil
}

// [END essentialcontacts_v1_essentialcontactsservice_contact_get]
