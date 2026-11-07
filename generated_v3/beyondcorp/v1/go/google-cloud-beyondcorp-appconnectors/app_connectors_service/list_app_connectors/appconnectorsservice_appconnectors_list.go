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

// [START beyondcorp_v1_appconnectorsservice_appconnectors_list]

import (
	"context"
	"fmt"
	"io"

	beyondcorp "cloud.google.com/go/beyondcorp/appconnectors/apiv1"
	"cloud.google.com/go/beyondcorp/appconnectors/apiv1/appconnectorspb"
	"google.golang.org/api/iterator"
)

// listAppConnectors lists App Connectors in a given project and location.
// AppConnectorsService is deprecated; use Security Gateway instead.
func listAppConnectors(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := beyondcorp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &appconnectorspb.ListAppConnectorsRequest{
		Parent: parent,
	}

	it := client.ListAppConnectors(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListAppConnectors failed: %w", err)
		}
		fmt.Fprintf(w, "App Connector: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No App Connectors found.")
	}

	return nil
}

// [END beyondcorp_v1_appconnectorsservice_appconnectors_list]
