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

// [START essentialcontacts_v1_essentialcontactsservice_contacts_list]

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"strings"

	essentialcontacts "cloud.google.com/go/essentialcontacts/apiv1"
	essentialcontactspb "cloud.google.com/go/essentialcontacts/apiv1/essentialcontactspb"
	"google.golang.org/api/iterator"
)

// listContacts lists the essential contacts for an organization.
func listContacts(ctx context.Context, w io.Writer, organizationID string) error {
	parent := strings.TrimSpace(organizationID)
	if parent == "" {
		if org := os.Getenv("ORGANIZATION_ID"); org != "" {
			parent = org
		} else if proj := os.Getenv("GOOGLE_CLOUD_PROJECT"); proj != "" {
			parent = fmt.Sprintf("projects/%s", proj)
		}
	}
	if !strings.HasPrefix(parent, "projects/") && !strings.HasPrefix(parent, "folders/") {
		parent = fmt.Sprintf("organizations/%s", strings.TrimPrefix(parent, "organizations/"))
	}

	client, err := essentialcontacts.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("essentialcontacts.NewClient: %w", err)
	}
	defer client.Close()

	req := &essentialcontactspb.ListContactsRequest{
		Parent: parent,
	}

	it := client.ListContacts(ctx, req)
	for {
		contact, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Contact: %s (%s)\n", contact.GetName(), contact.GetEmail())
	}

	return nil
}

// [END essentialcontacts_v1_essentialcontactsservice_contacts_list]
