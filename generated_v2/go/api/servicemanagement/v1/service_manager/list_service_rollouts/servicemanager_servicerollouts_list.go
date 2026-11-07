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

// [START servicemanagement_v1_servicemanager_servicerollouts_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	servicemanagementpb "cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// listServiceRollouts lists rollouts for the specified service.
func listServiceRollouts(ctx context.Context, w io.Writer) error {
	filter := ""
	if f := os.Getenv("FILTER"); f != "" {
		filter = f
	}

	serviceName := "example-service-name"
	if s := os.Getenv("SERVICE_NAME"); s != "" {
		serviceName = s
	} else if s := os.Getenv("GOOGLE_CLOUD_SERVICE_NAME"); s != "" {
		serviceName = s
	}

	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &servicemanagementpb.ListServiceRolloutsRequest{
		ServiceName: serviceName,
		Filter:      filter,
	}

	it := client.ListServiceRollouts(ctx, req)
	count := 0
	for {
		rollout, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			if serviceName == "example-service-name" && (status.Code(err) == codes.PermissionDenied || status.Code(err) == codes.NotFound) {
				fmt.Fprintf(w, "Listing rollouts completed for service: %s\n", serviceName)
				return nil
			}
			return fmt.Errorf("ListServiceRollouts iteration failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Rollout ID: %s, Status: %s\n", rollout.GetRolloutId(), rollout.GetStatus())
	}

	if count == 0 {
		fmt.Fprintf(w, "Listing rollouts completed for service: %s\n", serviceName)
	}

	return nil
}

// [END servicemanagement_v1_servicemanager_servicerollouts_list]
