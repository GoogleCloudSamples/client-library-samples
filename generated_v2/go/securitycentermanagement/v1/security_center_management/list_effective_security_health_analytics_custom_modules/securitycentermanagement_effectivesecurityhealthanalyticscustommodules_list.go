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

// [START securitycentermanagement_v1_securitycentermanagement_effectivesecurityhealthanalyticscustommodules_list]

import (
	"context"
	"fmt"
	"io"

	securitycentermanagement "cloud.google.com/go/securitycentermanagement/apiv1"
	securitycentermanagementpb "cloud.google.com/go/securitycentermanagement/apiv1/securitycentermanagementpb"
	"google.golang.org/api/iterator"
)

// listEffectiveSecurityHealthAnalyticsCustomModules retrieves all effective Security Health Analytics custom modules for a project.
func listEffectiveSecurityHealthAnalyticsCustomModules(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := securitycentermanagement.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &securitycentermanagementpb.ListEffectiveSecurityHealthAnalyticsCustomModulesRequest{
		Parent: parent,
	}

	it := client.ListEffectiveSecurityHealthAnalyticsCustomModules(ctx, req)
	var count int
	for {
		module, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate custom modules: %w", err)
		}

		fmt.Fprintf(w, "Custom module: %s\n", module.GetName())
		fmt.Fprintf(w, "  Display name: %s\n", module.GetDisplayName())
		fmt.Fprintf(w, "  Enablement state: %s\n", module.GetEnablementState())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No effective Security Health Analytics custom modules found.")
	}

	return nil
}

// [END securitycentermanagement_v1_securitycentermanagement_effectivesecurityhealthanalyticscustommodules_list]
