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

// [START essentialcontacts_v1_essentialcontactsservice_compute_contacts]

import (
	"context"
	"fmt"
	"io"

	essentialcontacts "cloud.google.com/go/essentialcontacts/apiv1"
	essentialcontactspb "cloud.google.com/go/essentialcontacts/apiv1/essentialcontactspb"
	"google.golang.org/api/iterator"
)

// computeContacts computes all contacts subscribed to notifications for a project.
func computeContacts(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	notificationCategories := []essentialcontactspb.NotificationCategory{
		essentialcontactspb.NotificationCategory_ALL,
	}

	client, err := essentialcontacts.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &essentialcontactspb.ComputeContactsRequest{
		Parent:                 parent,
		NotificationCategories: notificationCategories,
	}

	it := client.ComputeContacts(ctx, req)
	for {
		contact, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate contacts: %w", err)
		}
		fmt.Fprintf(w, "Contact: %s (%s)\n", contact.GetName(), contact.GetEmail())
	}

	return nil
}

// [END essentialcontacts_v1_essentialcontactsservice_compute_contacts]
