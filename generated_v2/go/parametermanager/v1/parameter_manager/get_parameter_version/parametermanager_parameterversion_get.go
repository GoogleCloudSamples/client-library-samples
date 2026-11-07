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

// [START parametermanager_v1_parametermanager_parameterversion_get]

import (
	"context"
	"fmt"
	"io"

	parametermanager "cloud.google.com/go/parametermanager/apiv1"
	"cloud.google.com/go/parametermanager/apiv1/parametermanagerpb"
	"google.golang.org/api/option"
)

// getParameterVersion retrieves a specific version of a parameter.
func getParameterVersion(ctx context.Context, w io.Writer, projectID string, locationID string, parameterID string, versionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/parameters/%s/versions/%s", projectID, locationID, parameterID, versionID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("parametermanager.%s.rep.googleapis.com:443", locationID)))
	}

	client, err := parametermanager.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("failed to create parametermanager client: %w", err)
	}
	defer client.Close()

	req := &parametermanagerpb.GetParameterVersionRequest{
		Name: name,
		View: parametermanagerpb.View_FULL,
	}

	version, err := client.GetParameterVersion(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to get parameter version: %w", err)
	}

	fmt.Fprintf(w, "Retrieved parameter version: %s\n", version.GetName())
	return nil
}

// [END parametermanager_v1_parametermanager_parameterversion_get]
