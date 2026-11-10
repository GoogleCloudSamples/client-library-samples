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

// [START cloudprofiler_v2_profilerservice_offlineprofile_create]

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"runtime/pprof"
	"time"

	cloudprofiler "cloud.google.com/go/cloudprofiler/apiv2"
	cloudprofilerpb "cloud.google.com/go/cloudprofiler/apiv2/cloudprofilerpb"
	"google.golang.org/protobuf/types/known/durationpb"
)

// createOfflineProfile creates an offline profile for Cloud Profiler ingestion.
func createOfflineProfile(ctx context.Context, w io.Writer, projectID string) error {
	client, err := cloudprofiler.NewProfilerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProfilerClient: %w", err)
	}
	defer client.Close()

	// Collect CPU profile data in gzip-compressed pprof format.
	var buf bytes.Buffer
	if err := pprof.StartCPUProfile(&buf); err != nil {
		return fmt.Errorf("pprof.StartCPUProfile: %w", err)
	}
	for start := time.Now(); time.Since(start) < 200*time.Millisecond; {
	}
	pprof.StopCPUProfile()

	profile := &cloudprofilerpb.Profile{
		ProfileType: cloudprofilerpb.ProfileType_CPU,
		Deployment: &cloudprofilerpb.Deployment{
			ProjectId: projectID,
			Target:    "example-service",
		},
		Duration:     durationpb.New(60 * time.Second),
		ProfileBytes: buf.Bytes(),
	}

	req := &cloudprofilerpb.CreateOfflineProfileRequest{
		Parent:  fmt.Sprintf("projects/%s", projectID),
		Profile: profile,
	}

	resp, err := client.CreateOfflineProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateOfflineProfile: %w", err)
	}

	fmt.Fprintf(w, "Created profile: %s\n", resp.GetName())
	return nil
}

// [END cloudprofiler_v2_profilerservice_offlineprofile_create]
