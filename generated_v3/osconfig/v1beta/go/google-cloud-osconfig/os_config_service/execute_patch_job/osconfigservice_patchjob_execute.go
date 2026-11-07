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

// [START osconfig_v1beta_osconfigservice_execute_patch_job]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1beta"
	osconfigpb "cloud.google.com/go/osconfig/apiv1beta/osconfigpb"
)

// executePatchJob initiates a patch job across instances matching the instance filter.
func executePatchJob(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	instanceFilter := &osconfigpb.PatchInstanceFilter{
		All: true,
	}

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.ExecutePatchJobRequest{
		Parent:         parent,
		Description:    "Patch job run",
		InstanceFilter: instanceFilter,
	}

	resp, err := client.ExecutePatchJob(ctx, req)
	if err != nil {
		return fmt.Errorf("ExecutePatchJob: %w", err)
	}

	fmt.Fprintf(w, "Patch job started: %s\n", resp.GetName())
	return nil
}

// [END osconfig_v1beta_osconfigservice_execute_patch_job]
