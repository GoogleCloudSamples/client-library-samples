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

// [START cloudquotas_v1_cloudquotas_quotapreferences_list]

import (
	"context"
	"fmt"
	"io"

	cloudquotas "cloud.google.com/go/cloudquotas/apiv1beta"
	cloudquotaspb "cloud.google.com/go/cloudquotas/apiv1beta/cloudquotaspb"
	"google.golang.org/api/iterator"
)

// listQuotaPreferences lists quota preferences for a project and location.
func listQuotaPreferences(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := cloudquotas.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudquotaspb.ListQuotaPreferencesRequest{
		Parent: parent,
	}

	it := client.ListQuotaPreferences(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate quota preferences: %w", err)
		}
		fmt.Fprintf(w, "Quota preference: %s\n", resp.GetName())
	}

	return nil
}

// [END cloudquotas_v1_cloudquotas_quotapreferences_list]
