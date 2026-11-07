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

// [START parametermanager_v1_parametermanager_parameter_create]

import (
	"context"
	"fmt"
	"io"

	parametermanager "cloud.google.com/go/parametermanager/apiv1"
	parametermanagerpb "cloud.google.com/go/parametermanager/apiv1/parametermanagerpb"
)

// createParameter creates a new parameter in Google Cloud Parameter Manager.
func createParameter(ctx context.Context, w io.Writer, projectID string, locationID string, parameterID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	parameter := &parametermanagerpb.Parameter{
		Format: parametermanagerpb.ParameterFormat_UNFORMATTED,
		Labels: map[string]string{
			"env": "example-env",
		},
	}

	client, err := parametermanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &parametermanagerpb.CreateParameterRequest{
		Parent:      parent,
		ParameterId: parameterID,
		Parameter:   parameter,
	}

	resp, err := client.CreateParameter(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateParameter failed: %w", err)
	}

	fmt.Fprintf(w, "Created parameter: %s\n", resp.GetName())
	return nil
}

// [END parametermanager_v1_parametermanager_parameter_create]
