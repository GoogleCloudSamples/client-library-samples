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

// [START oracledatabase_v1_oracledatabase_dbsystem_delete]

import (
	"context"
	"fmt"
	"io"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteDbSystem deletes an Oracle DB system.
func deleteDbSystem(ctx context.Context, w io.Writer, projectID string, locationID string, dbSystemID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/dbSystems/%s", projectID, locationID, dbSystemID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.DeleteDbSystemRequest{
		Name: name,
	}

	op, err := client.DeleteDbSystem(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Deleted DB system: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteDbSystem failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Deleted DB system: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted DB system: %s\n", name)
	return nil
}

// [END oracledatabase_v1_oracledatabase_dbsystem_delete]
