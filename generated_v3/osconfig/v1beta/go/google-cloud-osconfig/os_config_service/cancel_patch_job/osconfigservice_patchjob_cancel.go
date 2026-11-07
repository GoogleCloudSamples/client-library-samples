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

// [START osconfig_v1beta_osconfigservice_patchjob_cancel]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1beta"
	osconfigpb "cloud.google.com/go/osconfig/apiv1beta/osconfigpb"
)

// cancelPatchJob cancels an active patch job in OS Config.
func cancelPatchJob(ctx context.Context, w io.Writer, projectID string, patchJobID string) error {
	name := fmt.Sprintf("projects/%s/patchJobs/%s", projectID, patchJobID)

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.CancelPatchJobRequest{
		Name: name,
	}

	resp, err := client.CancelPatchJob(ctx, req)
	if err != nil {
		return fmt.Errorf("CancelPatchJob: %w", err)
	}

	fmt.Fprintf(w, "Canceled patch job: %s (State: %s)\n", resp.GetName(), resp.GetState())
	return nil
}

// [END osconfig_v1beta_osconfigservice_patchjob_cancel]
