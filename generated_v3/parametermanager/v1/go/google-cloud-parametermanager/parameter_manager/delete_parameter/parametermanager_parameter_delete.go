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

// [START parametermanager_v1_parametermanager_parameter_delete]

import (
	"context"
	"fmt"
	"io"

	parametermanager "cloud.google.com/go/parametermanager/apiv1"
	parametermanagerpb "cloud.google.com/go/parametermanager/apiv1/parametermanagerpb"
)

// deleteParameter deletes an existing parameter if all associated parameter versions are already deleted.
func deleteParameter(ctx context.Context, w io.Writer, projectID string, locationID string, parameterID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/parameters/%s", projectID, locationID, parameterID)

	client, err := parametermanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &parametermanagerpb.DeleteParameterRequest{
		Name: name,
	}

	if err := client.DeleteParameter(ctx, req); err != nil {
		return fmt.Errorf("failed to delete parameter: %w", err)
	}

	fmt.Fprintf(w, "Deleted parameter: %s\n", name)
	return nil
}

// [END parametermanager_v1_parametermanager_parameter_delete]
