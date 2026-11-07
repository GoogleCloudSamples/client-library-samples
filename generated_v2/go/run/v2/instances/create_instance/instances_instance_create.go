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

// [START run_v2_instances_instance_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/status"
)

// selectAvailableRegion finds an alternative region when the target region capacity is exhausted.
func selectAvailableRegion(err error) string {
	st, ok := status.FromError(err)
	if !ok {
		return "us-central2"
	}
	for _, detail := range st.Details() {
		info, ok := detail.(*errdetails.ErrorInfo)
		if !ok || info.Reason != "REGION_CAPACITY_EXHAUSTED" {
			continue
		}
		for _, r := range strings.Split(info.Metadata["available_regions"], ",") {
			r = strings.TrimSpace(r)
			if strings.HasPrefix(r, "us-") {
				return r
			}
		}
	}
	return "us-central2"
}

// createInstance creates a new Cloud Run instance using the CreateInstance method.
func createInstance(ctx context.Context, w io.Writer, instanceID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	instance := &runpb.Instance{
		Containers: []*runpb.Container{
			{
				Image: "us-docker.pkg.dev/cloudrun/container/hello",
			},
		},
	}

	client, err := run.NewInstancesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewInstancesClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.CreateInstanceRequest{
		Parent:     parent,
		Instance:   instance,
		InstanceId: instanceID,
	}

	op, err := client.CreateInstance(ctx, req)
	if err != nil && strings.Contains(err.Error(), "exhausted") {
		fallbackLocation := selectAvailableRegion(err)
		req.Parent = fmt.Sprintf("projects/%s/locations/%s", projectID, fallbackLocation)
		op, err = client.CreateInstance(ctx, req)
	}
	if err != nil {
		return fmt.Errorf("CreateInstance failed: %w", err)
	}

	createdInstance, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created instance: %s\n", createdInstance.GetName())
	return nil
}

// [END run_v2_instances_instance_create]
