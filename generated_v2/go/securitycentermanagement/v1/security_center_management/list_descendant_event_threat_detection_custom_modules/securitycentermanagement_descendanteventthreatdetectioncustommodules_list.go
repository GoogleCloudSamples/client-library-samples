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

// [START securitycentermanagement_v1_securitycentermanagement_descendanteventthreatdetectioncustommodules_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	securitycentermanagement "cloud.google.com/go/securitycentermanagement/apiv1"
	securitycentermanagementpb "cloud.google.com/go/securitycentermanagement/apiv1/securitycentermanagementpb"
	"google.golang.org/api/iterator"
)

// listDescendantEventThreatDetectionCustomModules lists all descendant Event Threat Detection custom modules.
func listDescendantEventThreatDetectionCustomModules(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := securitycentermanagement.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &securitycentermanagementpb.ListDescendantEventThreatDetectionCustomModulesRequest{
		Parent: parent,
	}

	it := client.ListDescendantEventThreatDetectionCustomModules(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Descendant Event Threat Detection custom module: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No descendant Event Threat Detection custom modules found.")
	}

	return nil
}

// [END securitycentermanagement_v1_securitycentermanagement_descendanteventthreatdetectioncustommodules_list]
