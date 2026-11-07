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

// [START analyticshub_v1_datapolicyservice_datapolicies_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	datapolicies "cloud.google.com/go/bigquery/datapolicies/apiv1"
	"cloud.google.com/go/bigquery/datapolicies/apiv1/datapoliciespb"
	"google.golang.org/api/iterator"
)

// listDataPolicies lists data policies in a project location.
func listDataPolicies(ctx context.Context, w io.Writer, locationID string) error {
	projectNumber := "example-project-number"
	if env := os.Getenv("PROJECT_NUMBER"); env != "" {
		projectNumber = env
	} else if env := os.Getenv("GOOGLE_CLOUD_PROJECT"); env != "" {
		projectNumber = env
	} else if env := os.Getenv("PROJECT_ID"); env != "" {
		projectNumber = env
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectNumber, locationID)

	client, err := datapolicies.NewDataPolicyClient(ctx)
	if err != nil {
		return fmt.Errorf("datapolicies.NewDataPolicyClient: %w", err)
	}
	defer client.Close()

	req := &datapoliciespb.ListDataPoliciesRequest{
		Parent: parent,
	}

	it := client.ListDataPolicies(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Data policy: %s\n", resp.GetName())
	}

	return nil
}

// [END analyticshub_v1_datapolicyservice_datapolicies_list]
