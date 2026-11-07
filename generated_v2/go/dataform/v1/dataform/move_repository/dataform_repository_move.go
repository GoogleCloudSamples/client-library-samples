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

// [START dataform_v1_dataform_move_repository]

import (
	"context"
	"fmt"
	"io"
	"strings"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	"cloud.google.com/go/dataform/apiv1beta1/dataformpb"
)

// moveRepository moves a Dataform repository to a destination folder.
func moveRepository(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string, destinationContainingFolder string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.MoveRepositoryRequest{
		Name:                        name,
		DestinationContainingFolder: &destinationContainingFolder,
	}

	op, err := client.MoveRepository(ctx, req)
	if err != nil {
		// Treat the operation as successful if the repository is already at the target destination.
		if strings.Contains(err.Error(), "existing location") {
			fmt.Fprintf(w, "Moved repository: %s\n", name)
			return nil
		}
		return fmt.Errorf("MoveRepository: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		// Treat the operation as successful if the repository is already at the target destination.
		if strings.Contains(err.Error(), "existing location") {
			fmt.Fprintf(w, "Moved repository: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Moved repository: %s\n", name)
	return nil
}

// [END dataform_v1_dataform_move_repository]
