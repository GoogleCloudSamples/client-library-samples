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

// [START securitycentermanagement_v1_securitycentermanagement_descendantsecurityhealthanalyticscustommodules_list]

import (
	"context"
	"fmt"
	"io"

	securitycentermanagement "cloud.google.com/go/securitycentermanagement/apiv1"
	securitycentermanagementpb "cloud.google.com/go/securitycentermanagement/apiv1/securitycentermanagementpb"
	"google.golang.org/api/iterator"
)

// listDescendantSecurityHealthAnalyticsCustomModules lists all descendant Security Health Analytics custom modules for a project and location.
func listDescendantSecurityHealthAnalyticsCustomModules(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := securitycentermanagement.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &securitycentermanagementpb.ListDescendantSecurityHealthAnalyticsCustomModulesRequest{
		Parent: parent,
	}

	it := client.ListDescendantSecurityHealthAnalyticsCustomModules(ctx, req)
	count := 0
	for {
		module, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		fmt.Fprintf(w, "Custom module: %s (Display Name: %s)\n", module.GetName(), module.GetDisplayName())
		count++
	}

	fmt.Fprintf(w, "Listed %d descendant custom modules.\n", count)
	return nil
}

// [END securitycentermanagement_v1_securitycentermanagement_descendantsecurityhealthanalyticscustommodules_list]
