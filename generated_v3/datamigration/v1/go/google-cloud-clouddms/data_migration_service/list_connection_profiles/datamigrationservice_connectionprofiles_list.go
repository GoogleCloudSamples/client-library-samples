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

// [START datamigration_v1_datamigrationservice_connectionprofiles_list]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	"cloud.google.com/go/clouddms/apiv1/clouddmspb"
	"google.golang.org/api/iterator"
)

// listConnectionProfiles lists the Database Migration Service connection profiles in a given location.
func listConnectionProfiles(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient: %w", err)
	}
	defer client.Close()

	req := &clouddmspb.ListConnectionProfilesRequest{
		Parent: parent,
	}

	it := client.ListConnectionProfiles(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListConnectionProfiles iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Connection profile: %s\n", resp.GetName())
	}

	return nil
}

// [END datamigration_v1_datamigrationservice_connectionprofiles_list]
