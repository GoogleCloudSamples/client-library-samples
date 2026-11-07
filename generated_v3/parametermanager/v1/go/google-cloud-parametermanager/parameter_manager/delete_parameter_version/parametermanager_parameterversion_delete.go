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

// [START parametermanager_v1_parametermanager_parameterversion_delete]

import (
	"context"
	"fmt"
	"io"

	parametermanager "cloud.google.com/go/parametermanager/apiv1"
	parametermanagerpb "cloud.google.com/go/parametermanager/apiv1/parametermanagerpb"
)

// deleteParameterVersion deletes a parameter version.
func deleteParameterVersion(ctx context.Context, w io.Writer, projectID string, locationID string, parameterID string, versionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/parameters/%s/versions/%s", projectID, locationID, parameterID, versionID)

	client, err := parametermanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &parametermanagerpb.DeleteParameterVersionRequest{
		Name: name,
	}

	if err := client.DeleteParameterVersion(ctx, req); err != nil {
		return fmt.Errorf("DeleteParameterVersion: %w", err)
	}

	fmt.Fprintf(w, "Deleted parameter version: %s\n", name)

	return nil
}

// [END parametermanager_v1_parametermanager_parameterversion_delete]
