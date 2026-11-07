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

// [START cloudbuild_v2_cloudbuild_build_get]

import (
	"context"
	"fmt"
	"io"

	cloudbuild "cloud.google.com/go/cloudbuild/apiv1"
	cloudbuildpb "cloud.google.com/go/cloudbuild/apiv1/v2/cloudbuildpb"
)

// Use the GetBuild method.
func getBuild(ctx context.Context, w io.Writer, projectID string, buildID string) error {
	client, err := cloudbuild.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %v", err)
	}
	defer client.Close()

	req := &cloudbuildpb.GetBuildRequest{
		ProjectId: projectID,
		Id:        buildID,
	}

	build, err := client.GetBuild(ctx, req)
	if err != nil {
		return fmt.Errorf("GetBuild failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved build: %s\n", build.GetId())
	return nil
}

// [END cloudbuild_v2_cloudbuild_build_get]
