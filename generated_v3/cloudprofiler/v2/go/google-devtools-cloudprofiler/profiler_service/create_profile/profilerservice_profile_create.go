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

// [START cloudprofiler_v2_profilerservice_profile_create]

import (
	"context"
	"fmt"
	"io"

	cloudprofiler "cloud.google.com/go/cloudprofiler/apiv2"
	cloudprofilerpb "cloud.google.com/go/cloudprofiler/apiv2/cloudprofilerpb"
)

// createProfile requests a profiling session from Cloud Profiler.
func createProfile(ctx context.Context, w io.Writer, projectID string) error {
	deployment := &cloudprofilerpb.Deployment{
		ProjectId: projectID,
		Target:    "example-service",
		Labels: map[string]string{
			"zone":     "us-central1-a",
			"language": "go",
		},
	}
	profileType := []cloudprofilerpb.ProfileType{
		cloudprofilerpb.ProfileType_CPU,
	}

	client, err := cloudprofiler.NewProfilerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProfilerClient: %w", err)
	}
	defer client.Close()

	req := &cloudprofilerpb.CreateProfileRequest{
		Parent:      fmt.Sprintf("projects/%s", projectID),
		Deployment:  deployment,
		ProfileType: profileType,
	}

	profile, err := client.CreateProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateProfile: %w", err)
	}

	fmt.Fprintf(w, "Created profile: %s\n", profile.GetName())

	return nil
}

// [END cloudprofiler_v2_profilerservice_profile_create]
